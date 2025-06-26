import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold">Conversational Commerce AI</h1>
            <p className="text-muted-foreground mt-2">
              AI-powered order status assistant with real-time capabilities
            </p>
          </div>
          <ThemeSwitcher />
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our AI assistant through an interactive chat interface or
              test the Server-Sent Events API endpoint directly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Chat Interface Option */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💬 Interactive Chat
                </CardTitle>
                <CardDescription>
                  Full-featured chat interface with real-time streaming
                  responses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Real-time conversation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Order status lookup
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Responsive design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    Dark/light theme support
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <a href="/chat">Launch Chat Interface</a>
                </Button>
              </CardContent>
            </Card>

            {/* SSE Demo Option */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌊 SSE Endpoint Demo
                </CardTitle>
                <CardDescription>
                  Test the Server-Sent Events API with real-time event
                  monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    Traditional SSE protocol
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    Event stream monitoring
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    External integration ready
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    Debug-friendly interface
                  </li>
                </ul>
                <Button variant="outline" asChild className="w-full">
                  <a href="/sse-demo">View SSE Demo</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Overview</CardTitle>
              <CardDescription>
                Learn about the underlying technology and API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">🚀 Chat Interface</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Built with AI SDK and React hooks for optimal streaming
                    performance.
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    POST /api/chat/stream
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">📡 SSE Endpoint</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Traditional Server-Sent Events with proper event formatting.
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">
                    POST /api/sse
                  </code>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-2">🛠️ Key Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium">OpenAI GPT-4</div>
                    <div className="text-muted-foreground">AI Engine</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">GraphQL</div>
                    <div className="text-muted-foreground">Order Data</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Streaming</div>
                    <div className="text-muted-foreground">Real-time</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">TypeScript</div>
                    <div className="text-muted-foreground">Type Safety</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
