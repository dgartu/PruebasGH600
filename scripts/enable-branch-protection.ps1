<#
.SYNOPSIS
    Enables branch protection on the `main` branch via the GitHub API using `gh`.

.DESCRIPTION
    This script configures branch protection rules for the `main` branch of the
    current repository. It requires:
      - The GitHub CLI (`gh`) installed and authenticated.
      - The repository to be the current directory's git remote (or specified
        explicitly via -Owner and -Repo).

    Protection rules applied:
      - Require a pull request before merging (1 approving review required).
      - Dismiss stale reviews: false.
      - Require code owner reviews: false.
      - Enforce admins: true (applies rules to repository admins too).
      - Required status checks: null (not enforced).
      - Restrictions: null (no push restrictions).

.PARAMETER Owner
    The GitHub repository owner (user or organization). If omitted, it is
    inferred from the current repository's remote.

.PARAMETER Repo
    The GitHub repository name. If omitted, it is inferred from the current
    repository's remote.

.PARAMETER Branch
    The branch to protect. Defaults to "main".

.PARAMETER ApprovingReviewCount
    Number of required approving reviews. Defaults to 1.

.EXAMPLE
    .\scripts\enable-branch-protection.ps1

    Enables branch protection on `main` for the current repository.

.EXAMPLE
    .\scripts\enable-branch-protection.ps1 -Owner "dgartu" -Repo "PruebasGH600"

    Enables branch protection on `main` for the specified repository.

.EXAMPLE
    .\scripts\enable-branch-protection.ps1 -Branch "develop" -ApprovingReviewCount 2

    Enables branch protection on `develop` requiring 2 approving reviews.
#>

param(
    [string]$Owner,
    [string]$Repo,
    [string]$Branch = "main",
    [int]$ApprovingReviewCount = 1
)

# --- Helper: Write colored output ---
function Write-Section {
    param([string]$Message)
    Write-Host ""
    Write-Host "=== $Message ===" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-ErrorMsg {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Warn {
    param([string]$Message)
    Write-Host "[WARN] $Message" -ForegroundColor Yellow
}

# --- Step 1: Verify gh CLI is installed ---
Write-Section "Verificando GitHub CLI (gh)"

$ghVersion = $null
try {
    $ghVersion = gh --version 2>$null
} catch {
    # gh not found
}

if (-not $ghVersion) {
    Write-ErrorMsg "GitHub CLI (gh) no está instalado o no está en el PATH."
    Write-Host "Descárgalo desde: https://cli.github.com/"
    exit 1
}

Write-Success "gh encontrado: $($ghVersion.Split("`n")[0])"

# --- Step 2: Verify gh is authenticated ---
Write-Section "Verificando autenticación"

$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-ErrorMsg "No estás autenticado en GitHub. Ejecuta: gh auth login"
    exit 1
}

Write-Success "Autenticado correctamente."

# --- Step 3: Resolve owner and repo ---
Write-Section "Resolviendo repositorio"

if (-not $Owner -or -not $Repo) {
    # Try to infer from git remote
    $remoteUrl = git remote get-url origin 2>$null
    if (-not $remoteUrl) {
        Write-ErrorMsg "No se pudo determinar el repositorio. Especifica -Owner y -Repo, o ejecuta desde un directorio git con remote 'origin'."
        exit 1
    }

    # Parse owner and repo from remote URL
    # Supports both HTTPS and SSH formats:
    #   https://github.com/owner/repo.git
    #   git@github.com:owner/repo.git
    if ($remoteUrl -match "github\.com[/:]([^/]+)/(.+?)(?:\.git)?$") {
        if (-not $Owner) { $Owner = $Matches[1] }
        if (-not $Repo)  { $Repo = $Matches[2] }
    } else {
        Write-ErrorMsg "No se pudo parsear el remote URL: $remoteUrl"
        Write-Host "Especifica -Owner y -Repo manualmente."
        exit 1
    }
}

Write-Success "Owner: $Owner"
Write-Success "Repo:  $Repo"
Write-Success "Branch: $Branch"

# --- Step 4: Build the protection payload ---
Write-Section "Construyendo configuración de protección"

$protectionBody = @{
    required_status_checks = $null
    enforce_admins         = $true
    required_pull_request_reviews = @{
        required_approving_review_count = $ApprovingReviewCount
        dismiss_stale_reviews           = $false
        require_code_owner_reviews      = $false
    }
    restrictions = $null
} | ConvertTo-Json -Depth 10

Write-Host "Payload JSON:"
Write-Host $protectionBody

# --- Step 5: Apply branch protection via GitHub API ---
Write-Section "Aplicando protección de rama"

$apiUrl = "repos/$Owner/$Repo/branches/$Branch/protection"

try {
    $result = gh api -X PUT "$apiUrl" --input - <<< $protectionBody 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Protección de rama aplicada correctamente en '$Branch'."
    } else {
        Write-ErrorMsg "La API devolvió un error."
        Write-Host $result
        exit 1
    }
} catch {
    Write-ErrorMsg "Error al llamar a la API: $_"
    exit 1
}

# --- Step 6: Verify the protection was applied ---
Write-Section "Verificando configuración"

try {
    $verifyResult = gh api "repos/$Owner/$Repo/branches/$Branch/protection" --jq '{
        reviews: .required_pull_request_reviews.required_approving_review_count,
        enforce_admins: .enforce_admins.enabled,
        dismiss_stale_reviews: .required_pull_request_reviews.dismiss_stale_reviews,
        require_code_owner_reviews: .required_pull_request_reviews.require_code_owner_reviews,
        required_status_checks: .required_status_checks,
        restrictions: .restrictions
    }' 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Configuración actual de protección:"
        Write-Host $verifyResult
        Write-Success "Verificación completada."
    } else {
        Write-Warn "No se pudo verificar la configuración (la rama podría no estar protegida todavía)."
        Write-Host $verifyResult
    }
} catch {
    Write-Warn "Error durante la verificación: $_"
}

Write-Section "Proceso completado"
Write-Host "La rama '$Branch' en '$Owner/$Repo' ahora tiene protección de rama habilitada."
Write-Host ""
Write-Host "Reglas aplicadas:"
Write-Host "  - Require pull request antes de mergear"
Write-Host "  - Aprobaciones requeridas: $ApprovingReviewCount"
Write-Host "  - Dismiss stale reviews: false"
Write-Host "  - Require code owner reviews: false"
Write-Host "  - Enforce admins: true"
Write-Host "  - Required status checks: null (no exigidos)"
Write-Host "  - Restrictions: null (sin restricciones de push)"
