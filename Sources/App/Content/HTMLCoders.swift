import Vapor

struct HTML {
  let value: String
}

// extension HTML: ResponseEncodable {
//   public func encodeResponse(for request: Request) -> EventLoopFuture<Response> {
//     var headers = HTTPHeaders()
//     headers.add(name: .contentType, value: "text/html")
//     return request.eventLoop.makeSucceededFuture(.init(
//       status: .ok, headers: headers, body: .init(string: value)
//     ))
//   }
// }

extension HTML: AsyncResponseEncodable {
  public func encodeResponse(for request: Request) async throws -> Response {
    var headers = HTTPHeaders()
    headers.add(name: .contentType, value: "text/html")
    return .init(status: .ok, headers: headers, body: .init(string: value))
  }
}