# iota

Start a webserver on http://127.0.0.1:8080

```bash
# build and run
swift build
swift run

# clean, update and build
swift package clean
swift package update
swift package build

# create a new package
swift package init --type executable
```

## Serving Files

Files in the `/Public` directory are served by the middleware automatically.

```swift
// Method 1: Using your HTML struct
app.get { req -> HTML in
    let htmlContent = """
        <!DOCTYPE html>
        <html>
            <head><title>Hello</title></head>
            <body>
                <h1>Hello at \(Date())</h1>
            </body>
        </html>
        """
    return HTML(value: htmlContent)
}

// Method 2: Direct response with HTML content type
app.get { req -> Response in
    let htmlContent = """
        <!DOCTYPE html>
        <html>...</html>
        """
    return Response(
        status: .ok,
        headers: ["content-type": "text/html"],
        body: .init(string: htmlContent)
    )
}

// Method 3: Reading from a file and serving dynamically
app.get { req -> Response in
    let path = "path/to/template.html"
    var template = try String(contentsOfFile: path)
    
    // Do any dynamic replacements
    template = template.replacingOccurrences(of: "{{date}}", with: "\(Date())")
    
    return Response(
        status: .ok,
        headers: ["content-type": "text/html"],
        body: .init(string: template)
    )
}
```

## References

- https://docs.vapor.codes/getting-started/hello-world/
- https://github.com/vapor/template-bare