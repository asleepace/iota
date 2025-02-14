


class Home: Page {

  var title: String { "Home" }

  init() {
    super.init("""
      <div class="container-centered">
        <h1>Home</h1>
        <p>This is the home page.</p>
      </div>
      """
    )
  }
} 