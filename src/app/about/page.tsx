import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, MapPin, Award, Heart, Zap } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { label: "Events Hosted", value: "500+", icon: Calendar },
    { label: "Happy Customers", value: "10K+", icon: Users },
    { label: "Cities Covered", value: "25+", icon: MapPin },
    { label: "Years Experience", value: "5+", icon: Award },
  ]

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description: "We prioritize our customers' experience and satisfaction above everything else.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously innovate to provide the best event booking experience.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every event we help organize and promote.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-4">About EventHub</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connecting People Through
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {" "}
                Amazing Events
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              We're passionate about bringing people together through unforgettable experiences. From intimate seminars
              to grand concerts, we make event discovery and booking seamless.
            </p>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-400/20 rounded-full animate-bounce" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-400/20 rounded-full animate-ping" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <stat.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-purple-100 text-purple-800 mb-4">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Born from a passion for bringing people together
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  EventHub was founded in 2019 with a simple mission: make discovering and attending events as easy as
                  possible. We noticed that amazing events were happening everywhere, but people struggled to find them
                  or the booking process was complicated.
                </p>
                <p>
                  Starting with just a handful of local seminars in Jakarta, we've grown to become Indonesia's leading
                  event discovery platform, hosting everything from intimate workshops to massive concerts and
                  exhibitions.
                </p>
                <p>
                  Today, we're proud to have helped over 10,000 people discover their next favorite event, and we're
                  just getting started.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image src="/placeholder.svg?height=400&width=600" alt="EventHub team" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <p className="text-sm text-gray-600">Founded in</p>
                <p className="text-2xl font-bold text-purple-600">2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What drives us every day</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do, from the events we promote to the way we serve our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet the people behind EventHub</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're a diverse team of event enthusiasts, tech experts, and customer service champions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", image: "/placeholder-user.jpg" },
              { name: "Michael Chen", role: "CTO", image: "/placeholder-user.jpg" },
              { name: "Emily Rodriguez", role: "Head of Events", image: "/placeholder-user.jpg" },
            ].map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="relative h-32 w-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-medium">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
