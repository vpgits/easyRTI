import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import CreateRequestForm from "./components/create-request-form/RequestForm";

export default function App() {
  return (
    <main className="min-h-screen w-full bg-background flex items-center">
      <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 w-full">
        <div className="space-y-6 flex flex-col items-center">
          {" "}
          {/* Added items-center here */}
          {/* Header */}
          <div className="space-y-2 text-center">
            {" "}
            {/* Added text-center for consistency */}
            <h1 className="text-3xl font-bold">RTI Request Generator</h1>
            <p className="text-muted-foreground">
              Generate Right to Information requests in multiple languages
            </p>
          </div>
          {/* Instructions Card */}
          <Card className="w-full md:w-[700px]">
            {" "}
            {/* Added consistent width */}
            <CardHeader>
              <CardTitle>How to use</CardTitle>
              <CardDescription>
                Follow these steps to generate your RTI request:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                <li>Select your preferred language</li>
                <li>Search and select the institution you want to contact</li>
                <li>Choose a template or write your own request</li>
                <li>Generate your request document</li>
              </ol>
            </CardContent>
          </Card>
          {/* Create Request Form */}
          <section className="w-full md:w-[700px]">
            <CreateRequestForm />
          </section>
          {/* Footer */}
          <footer className="text-center text-sm text-muted-foreground">
            <p>
              For more information about Right to Information, visit the
              official RTI website
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
