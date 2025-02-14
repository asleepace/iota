


class Home: Page {
    
    static var html: String {
        try! String(contentsOfFile: "Sources/App/Pages/Templates/template.html")
    }

    var title: String { "Home" }
    
    override var value: String {
        print("Getting html\n\n")
        return Self.html
    }

    init() throws {
        super.init("")
    }
}
