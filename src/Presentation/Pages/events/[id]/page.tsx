import { EventDetail } from "@/Presentation/Components/events/event-detail"
import { AppLayout } from "@/Presentation/Components/layout/app-layout"
interface EventDetailPageProps {
  params: {
    id: string
  }
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  return (
    <AppLayout>
      <EventDetail eventId={params.id} />
    </AppLayout>
  )
}
