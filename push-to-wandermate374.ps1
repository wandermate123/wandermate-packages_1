# Push this project to wandermate374/wandermate-packages
# Run this AFTER creating the repo on GitHub (one click on the page that opened).

Set-Location $PSScriptRoot
git push -u wandermate374 main
if ($LASTEXITCODE -eq 0) { Write-Host "`nDone. In Vercel: Add New Project -> Import wandermate374/wandermate-packages" -ForegroundColor Green }
