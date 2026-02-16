Write-Host "🔍 Validação de Idioma - Safer Front-End" -ForegroundColor Blue
Write-Host "📋 Idioma padrão: Português Brasileiro" -ForegroundColor Blue
Write-Host ""

$IssuesFound = 0

Write-Host "🔍 Buscando inconsistências..." -ForegroundColor Yellow

# Buscar padrões problemáticos
$patterns = @("Eliminar", "eliminando", "eliminação")

foreach ($pattern in $patterns) {
    $results = Select-String -Path "src\**\*.tsx", "src\**\*.ts" -Pattern $pattern -ErrorAction SilentlyContinue
    
    foreach ($result in $results) {
        Write-Host "❌ Inconsistência:" -ForegroundColor Red
        Write-Host "   📁 $($result.Filename)" -ForegroundColor Cyan
        Write-Host "   📍 Linha $($result.LineNumber)"
        Write-Host "   🔴 $($result.Line.Trim())"
        Write-Host ""
        $IssuesFound++
    }
}

if ($IssuesFound -eq 0) {
    Write-Host "✅ Projeto consistente em português!" -ForegroundColor Green
} else {
    Write-Host "❌ $IssuesFound inconsistência(s) encontrada(s)" -ForegroundColor Red
}

Write-Host ""