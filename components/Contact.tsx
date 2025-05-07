"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const socialIconVariants = {
  hidden: { scale: 0, opacity: 0, rotate: -180 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 10,
    },
  },
  hover: {
    y: -5,
    scale: 1.2,
    rotate: 360,
    transition: { duration: 0.4 },
  },
};

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formTouched, setFormTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setFormTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setFormTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateForm = () => {
    if (!formState.name) return "Name is required";
    if (!formState.email) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formState.email)) return "Email is invalid";
    if (!formState.subject) return "Subject is required";
    if (!formState.message) return "Message is required";
    if (formState.message.length < 10) return "Message is too short";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setFormTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div ref={ref} className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out to me using the contact form below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    shivjani2005@gmail.com
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Send me an email anytime!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Mon-Fri from 9am to 5pm
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Ahmedabad , Gujarat
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    Available for remote work worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">Follow Me</h3>
            <div className="flex gap-4 justify-center">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 transition-colors"
                variants={socialIconVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <img
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                  alt="GitHub"
                  width="24"
                  height="24"
                />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/shivjani"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400 transition-colors"
                variants={socialIconVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <img
                  src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                  alt="LinkedIn"
                  width="24"
                  height="24"
                />
              </motion.a>
              </div>

              <div className="flex-1 flex justify-center">
              <div className="flex gap-4 ">
                <img src ="https://media.giphy.com/media/92KgrxwgebKs7eFkqr/giphy.gif?cid=ecf05e47sqp94kdfzo3vjrw6q9tf1thsmlv9axus2uyv8hgn&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="gif"/>
                   
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
