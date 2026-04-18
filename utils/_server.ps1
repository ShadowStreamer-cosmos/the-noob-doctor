$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:8888/")
$listener.Start()
Write-Host "Server running at http://localhost:8888"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $path = $context.Request.Url.LocalPath
    if ($path -eq "/") { $path = "/index.html" }
    
    $dir = "c:\Users\sarka\OneDrive\Desktop\SORTED\ANTIGRAVITY FILE RUN"
    $filePath = Join-Path $dir ($path.TrimStart("/").Replace("/", "\"))
    
    if (Test-Path $filePath) {
        $content = [IO.File]::ReadAllBytes($filePath)
        $ext = [IO.Path]::GetExtension($filePath)
        $context.Response.ContentType = switch ($ext) {
            ".html" { "text/html;charset=utf-8" }
            ".css"  { "text/css;charset=utf-8" }
            ".js"   { "application/javascript;charset=utf-8" }
            default { "application/octet-stream" }
        }
        $context.Response.ContentLength64 = $content.Length
        $context.Response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $context.Response.StatusCode = 404
    }
    $context.Response.Close()
}
