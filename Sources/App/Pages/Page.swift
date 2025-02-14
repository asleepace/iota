import Vapor

protocol Templatable {
    var template: String       { get }
    var title: String          { get }
    var lang: String           { get }
    var body: String           { get }
    var meta: [String]         { get }
    var stylesheets: [String]  { get }
    var scripts: [String]      { get }
}

extension Templatable {
    var title: String { "iota" }
    var lang: String  { "en" }

    var meta: [String] {
        return [
            "<meta charset=\"UTF-8\">",
            "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
            "<title>\(title)</title>"
        ]
    }

    var stylesheets: [String] { 
      return ["<link rel=\"stylesheet\" href=\"style.css\">"]
     }

    var scripts: [String] { 
      return [            
        "<script src=\"scripts/htmx@2.0.4.min.js\"></script>",
        "<script src=\"scripts/htmx-element.js\" type=\"module\"></script>",
        "<script src=\"components/theme-toggle.js\" defer></script>"
      ]
    }

    var styles: String {
      """
        @font-face {
            font-family: 'Libre Baskerville';
            src: url('/fonts/LibreBaskerville-Regular.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
        }

        @font-face {
            font-family: 'Libre Baskerville';
            src: url('/fonts/LibreBaskerville-Bold.ttf') format('truetype');
            font-weight: 700;
            font-style: normal;
        }

        @font-face {
            font-family: 'Libre Baskerville';
            src: url('/fonts/LibreBaskerville-Italic.ttf') format('truetype');
            font-weight: 400;
            font-style: italic;
        }
        """
    }
    
    var template: String {"""
        <!DOCTYPE html>
        <html lang="{{lang}}">
        <head>
            {{meta}}
            {{stylesheets}}
        </head>
        <body>
            {{body}}
        </body>
        {{scripts}}
        </html>
        """
    }
    
    var value: String {
        print("value called: \(self)")
        return template
            .replacingOccurrences(of: "{{lang}}", with: lang)
            .replacingOccurrences(of: "{{meta}}", with: meta.joined(separator: "\n    "))
            .replacingOccurrences(of: "{{stylesheets}}", with: stylesheets.joined(separator: "\n    "))
            .replacingOccurrences(of: "{{scripts}}", with: scripts.joined(separator: "\n    "))
            .replacingOccurrences(of: "{{body}}", with: body)
    }
}

class Page: Templatable, AsyncResponseEncodable {
    
    var headers: HTTPHeaders {
        var headers = HTTPHeaders()
        headers.add(name: .contentType, value: "text/html")
        return headers
    }
    
    let body: String
    
    var value: String {
        print("value called: \(self)")
        return template
            .replacingOccurrences(of: "{{lang}}", with: lang)
            .replacingOccurrences(of: "{{meta}}", with: meta.joined(separator: "\n    "))
            .replacingOccurrences(of: "{{stylesheets}}", with: stylesheets.joined(separator: "\n    "))
            .replacingOccurrences(of: "{{scripts}}", with: scripts.joined(separator: "\n    "))
            .replacingOccurrences(of: "{{body}}", with: body)
    }
    
    init(_ body: String) {
        self.body = body
    }

    public func encodeResponse(for request: Request) async throws -> Response {
        return .init(status: .ok, headers: headers, body: .init(string: value))
    }
}





