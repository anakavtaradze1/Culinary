"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Star,
  Headphones,
  ChefHat,
  Camera,
  Heart,
  Users,
  AlertCircle,
} from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import styles from "./page.module.css";
import Link from "next/link";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(50, "Email cannot exceed 50 characters"),
  subject: yup
    .string()
    .required("Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject cannot exceed 100 characters"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    document.title = "Contact Us - Culinary Insights";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);

      setSubmitSuccess(true);
      reset();

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "hello@culinaryinsights.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "123 Culinary Street, Food City",
      description: "Our headquarters",
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Monday - Friday: 9:00 AM - 6:00 PM",
      description: "Weekend: 10:00 AM - 4:00 PM",
    },
    {
      icon: Calendar,
      title: "Book a Call",
      info: "Schedule a consultation",
      description: "Free 30-minute recipe consultation",
    },
    {
      icon: Headphones,
      title: "Live Support",
      info: "Chat with our team",
      description: "Available 24/7 for urgent queries",
    },
  ];

  const socialLinks = [
    {
      icon: FaInstagram,
      name: "Instagram",
      url: "https://www.instagram.com",
      followers: "25K",
    },
    {
      icon: FaFacebook,
      name: "Facebook",
      url: "https://www.facebook.com",
      followers: "15K",
    },
    {
      icon: FaLinkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com",
      followers: "8K",
    },
    {
      icon: FaYoutube,
      name: "YouTube",
      url: "https://www.youtube.com",
      followers: "50K",
    },
  ];

  const departments = [
    {
      name: "Recipe Development",
      email: "recipes@culinaryinsights.com",
      description: "Submit your recipes or collaborate with our chefs",
    },
    {
      name: "Technical Support",
      email: "support@culinaryinsights.com",
      description: "Website issues, account problems, or technical questions",
    },
    {
      name: "Partnership & Business",
      email: "business@culinaryinsights.com",
      description: "Brand partnerships, sponsorships, and business inquiries",
    },
    {
      name: "Media & Press",
      email: "press@culinaryinsights.com",
      description: "Press releases, media kits, and interview requests",
    },
  ];

  const faqs = [
    {
      question: "How can I submit my own recipe?",
      answer:
        "We'd love to feature your recipe! Send us your recipe details along with high-quality photos to recipes@culinaryinsights.com. Include ingredients, step-by-step instructions, cooking time, and serving size.",
    },
    {
      question: "Do you offer cooking classes?",
      answer:
        "Currently, we focus on providing online recipes and tutorials. However, we're planning to introduce virtual cooking classes soon! Join our newsletter to be the first to know.",
    },
    {
      question: "Can I request specific recipes?",
      answer:
        "Absolutely! Use our contact form to request specific recipes, and we'll do our best to add them to our collection within 2-3 weeks.",
    },
    {
      question: "Is there a cost to access recipes?",
      answer:
        "All our recipes are completely free! We believe everyone should have access to great cooking. Some premium features like meal planning may be introduced in the future.",
    },
    {
      question: "How do you ensure recipe quality?",
      answer:
        "Every recipe goes through our rigorous testing process. Our team of professional chefs and home cooks test each recipe multiple times before publishing.",
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer:
        "Yes! We have recipes for various dietary needs including vegan, gluten-free, keto, paleo, and more. Use our filter system to find recipes that match your requirements.",
    },
    {
      question: "Can I partner with Culinary Insights?",
      answer:
        "We're always open to partnerships! Contact our business team at business@culinaryinsights.com with your proposal. We work with food brands, restaurants, and culinary influencers.",
    },
    {
      question: "How often do you add new recipes?",
      answer:
        "We add 5-10 new recipes every week! Follow us on social media or subscribe to our newsletter to stay updated with the latest additions.",
    },
  ];

  const teamMembers = [
    {
      name: "Chef Maria Rodriguez",
      role: "Head of Recipe Development",
      bio: "20+ years of culinary experience specializing in Mediterranean and Latin American cuisine.",
      icon: ChefHat,
    },
    {
      name: "James Chen",
      role: "Food Photographer",
      bio: "Award-winning food photographer with expertise in making every dish look irresistible.",
      icon: Camera,
    },
    {
      name: "Sarah Williams",
      role: "Nutrition Consultant",
      bio: "Registered dietitian ensuring all recipes meet high nutritional standards.",
      icon: Heart,
    },
    {
      name: "David Kim",
      role: "Community Manager",
      bio: "Connecting with our amazing community of home cooks and food enthusiasts worldwide.",
      icon: Users,
    },
  ];

  const testimonials = [
    {
      name: "Emma Thompson",
      role: "Home Cook",
      text: "The recipes here have transformed my cooking! Clear instructions and amazing results every time.",
      rating: 5,
    },
    {
      name: "Chef Michael Brown",
      role: "Professional Chef",
      text: "Even as a professional, I find inspiration here. The quality and variety are outstanding.",
      rating: 4,
    },
    {
      name: "Lisa Garcia",
      role: "Food Blogger",
      text: "My go-to source for reliable recipes. The community and support team are incredibly helpful!",
      rating: 5,
    },
  ];

  return (
    <div className={styles.contactPage}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>
          Get In <span className={styles.culinary}>Touch</span>
        </h1>
        <p className={styles.heroDescription}>
          Have a question, suggestion, or just want to say hello? We&apos;d love
          to hear from you!
        </p>
      </section>

      <div className={styles.container}>
        <section className={styles.contactInfoSection}>
          <h2 className={styles.sectionTitle}>
            Contact <span className={styles.culinary}>Information</span>
          </h2>
          <div className={styles.contactGrid}>
            {contactInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className={styles.contactCard}>
                  <div className={styles.contactIcon}>
                    <IconComponent size={28} />
                  </div>
                  <h3 className={styles.contactTitle}>{item.title}</h3>
                  <p className={styles.contactInfo}>{item.info}</p>
                  <p className={styles.contactDescription}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="form" className={styles.formSection}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={`${styles.sectionTitle} ${styles.formTitle}`}>
                Send Us a <span className={styles.culinary}>Message</span>
              </h2>
              <p className={styles.formDescription}>
                Whether you have a question about recipes, want to share
                feedback, or just want to say hi, we&apos;re here to help and
                would love to hear from you.
              </p>
            </div>

            {submitSuccess && (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you for your message! We&apos;ll get back to you soon.
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.contactForm}
            >
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    placeholder="Your full name"
                    className={errors.name ? styles.inputError : ""}
                  />
                  {errors.name && (
                    <div className={styles.errorMessage}>
                      <AlertCircle size={16} />
                      <span>{errors.name.message}</span>
                    </div>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="your.email@example.com"
                    className={errors.email ? styles.inputError : ""}
                  />
                  {errors.email && (
                    <div className={styles.errorMessage}>
                      <AlertCircle size={16} />
                      <span>{errors.email.message}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  {...register("subject")}
                  placeholder="What's this about?"
                  className={errors.subject ? styles.inputError : ""}
                />
                {errors.subject && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={16} />
                    <span>{errors.subject.message}</span>
                  </div>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={6}
                  placeholder="Tell us more about what you need..."
                  className={errors.message ? styles.inputError : ""}
                ></textarea>
                {errors.message && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={16} />
                    <span>{errors.message.message}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className={styles.spinner}></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={19} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        <section className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>
            Frequently Asked <span className={styles.culinary}>Questions</span>
          </h2>
          <div className={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <div key={index} className={styles.faqCard}>
                <div className={styles.faqIcon}>
                  <MessageCircle size={24} />
                </div>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.socialSection}>
          <h2 className={`${styles.sectionTitle} ${styles.socialTitle}`}>
            Follow Us on <span className={styles.culinary}>Social Media</span>
          </h2>
          <p className={styles.socialDescription}>
            Stay connected with our culinary community and get daily recipe
            inspiration!
          </p>
          <div className={styles.socialGrid}>
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  className={styles.socialCard}
                  target="_blank"
                >
                  <div className={styles.socialIcon}>
                    <IconComponent size={28} />
                  </div>
                  <h3 className={styles.socialName}>{social.name}</h3>
                  <p className={styles.socialFollowers}>
                    {social.followers} followers
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className={`${styles.sectionTitle} ${styles.departmentTitle}`}>
            Contact by <span className={styles.culinary}>Department</span>
          </h2>
          <div className={styles.departmentGrid}>
            {departments.map((dept, index) => (
              <div key={index} className={styles.departmentCard}>
                <h3 className={styles.departmentName}>{dept.name}</h3>
                <p className={styles.departmentEmail}>{dept.email}</p>
                <p className={styles.departmentDescription}>
                  {dept.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>
            Meet Our <span className={styles.culinary}>Team</span>
          </h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => {
              const IconComponent = member.icon;
              return (
                <div key={index} className={styles.teamCard}>
                  <div className={styles.teamIcon}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.mapSection}>
          <h2 className={styles.sectionTitle}>
            Find <span className={styles.culinary}>Our Location</span>
          </h2>
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <MapPin size={48} />
              <h3>Interactive Map</h3>
              <p>
                123 Culinary Street
                <br />
                Food City, FC 12345
              </p>
              <p className={styles.mapNote}>
                <iframe
                  className={styles.mapIframe}
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d442.7350558033778!2d44.74292405589271!3d41.712867139956884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sge!4v1764665056828!5m2!1sen!2sge"
                  width="600"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </p>
            </div>
            <div className={styles.locationInfo}>
              <h4>Getting Here</h4>
              <ul className={styles.locationList}>
                <li>
                  <strong>By Car:</strong> Free parking available in our
                  building
                </li>
                <li>
                  <strong>By Train:</strong> 5-minute walk from Central Station
                </li>
                <li>
                  <strong>By Bus:</strong> Stop #42 directly in front of
                  building
                </li>
                <li>
                  <strong>By Bike:</strong> Bike racks available at entrance
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className={`${styles.sectionTitle} ${styles.testimonialTitle}`}>
            What Our <span className={styles.culinary}>Community</span> Says
          </h2>
          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#ff6b35" color="#ff6b35" />
                  ))}
                </div>
                <p className={styles.testimonialText}>
                  &quot;{testimonial.text}&quot;
                </p>
                <div className={styles.testimonialAuthor}>
                  <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                  <p className={styles.testimonialRole}>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            Ready to Start <span className={styles.culinary}>Cooking</span>?
          </h2>
          <p className={styles.ctaDescription}>
            While you&apos;re here, why not explore our amazing collection of
            recipes from around the world?
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/recipes" className={styles.ctaButton}>
              Explore Recipes
            </Link>
            <a href="#form" className={styles.ctaButtonSecondary}>
              Get In Touch
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
