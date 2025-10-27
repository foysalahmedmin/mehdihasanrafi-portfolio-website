import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { z } from "zod";
import { usePageSEO } from "@/hooks/utils/usePageSeo";
import { useToast } from "@/hooks/utils/useToast";

export const insertContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContact = z.infer<typeof insertContactSchema>;

export default function Contact() {
  usePageSEO({
    title: "Contact",
    description: "Get in touch with Mehedi Hasan Rafi for research collaborations, speaking opportunities, or questions about atmospheric science. Contact information and message form available.",
  });
  const { toast } = useToast();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    mutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mehedi.rafi@university.edu",
      href: "mailto:mehedi.rafi@university.edu",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: MapPin,
      label: "Office",
      value: "Room 405, Environmental Sciences Building\nUniversity Campus",
      href: null,
    },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="py-12 lg:py-16 border-b bg-accent/20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm always interested in discussing research collaborations,
              speaking opportunities, or answering questions about my work in
              atmospheric science. Feel free to reach out!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-16 flex-1">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                {...field}
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="What is this regarding?"
                                {...field}
                                data-testid="input-subject"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Your message..."
                                rows={6}
                                {...field}
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={mutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {mutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex gap-3">
                      <info.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            data-testid={`link-${info.label.toLowerCase()}`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground whitespace-pre-line">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Social Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 rounded-md bg-accent hover-elevate active-elevate-2 transition-all"
                        data-testid={`link-social-${social.label.toLowerCase()}`}
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Connect with me on social media to stay updated with my latest
                    research and academic activities.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Office Hours:</strong><br />
                    Monday - Friday<br />
                    10:00 AM - 4:00 PM<br />
                    <span className="text-xs mt-2 block">
                      (Please schedule appointments in advance)
                    </span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
