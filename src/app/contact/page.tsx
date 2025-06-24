import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones } from "lucide-react"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Jl. Sudirman No. 123", "Jakarta Pusat 10220", "Indonesia"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+62 21 1234 5678", "+62 812 3456 7890", "Mon-Fri 9AM-6PM"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@eventhub.id", "support@eventhub.id", "We reply within 24h"],
    },
  ]

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      color: "bg-green-500",
    },
    {
      icon: Headphones,
      title: "Phone Support",
      description: "Speak directly with our experts",
      action: "Call Now",
      color: "bg-blue-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      color: "bg-purple-500",
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
            <Badge className="bg-white/20 text-white mb-4">Contact Us</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in Touch
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {" "}
                With Us
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Have questions about events, bookings, or need support? We're here to help you 24/7.
            </p>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-400/20 rounded-full animate-bounce" />
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <info.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="bg-purple-100 text-purple-800 mb-4">Send Message</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Let's start a conversation</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you're an event organizer looking to list your event, or an attendee with questions, we'd love
                to hear from you. Fill out the form and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Response Time</p>
                    <p className="text-gray-600">Usually within 2-4 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Headphones className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Support Hours</p>
                    <p className="text-gray-600">Monday - Friday, 9AM - 6PM WIB</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 mb-4">Support Options</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose how you'd like to connect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer multiple ways to get in touch. Choose the option that works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div
                    className={`${option.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <option.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{option.title}</h3>
                  <p className="text-gray-600 mb-6">{option.description}</p>
                  <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    {option.action}
                  </button>
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
