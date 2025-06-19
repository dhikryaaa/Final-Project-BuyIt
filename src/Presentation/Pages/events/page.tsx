import { EventsGrid } from "@/Presentation/Components/events/events-grid"
import { EventsHeader } from "@/Presentation/Components/events/events-header"
import { AppLayout } from "@/Presentation/Components/layout/app-layout"

export default function EventsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <EventsHeader />
        <EventsGrid />
      </div>
    </AppLayout>
  )
}
