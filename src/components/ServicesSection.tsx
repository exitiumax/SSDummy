import React, { FC } from 'react';
import { GraduationCap, BookCopy, Brain, PencilRuler, CalendarDays, School } from 'lucide-react';
import ServiceCard, { ServiceCardProps } from './ServiceCard';

const services: ServiceCardProps[] = [
  {
    icon: GraduationCap,
    title: 'College Counseling',
    description:
      'Navigate the college application process with expert guidance. From selecting the right schools to crafting compelling essays, we help students achieve their higher education goals.',
    gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
  },
  {
    icon: BookCopy,
    title: 'Test Prep',
    description:
      'Maximize your test scores with targeted preparation strategies. Our individualized programs cover SAT, ACT, and other standardized tests with proven techniques.',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-700',
  },
  {
    icon: Brain,
    title: 'Executive Functioning Coaching',
    description:
      'Develop essential organizational, time management, and study skills to build the habits needed for academic and life success.',
    gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
  },
  {
    icon: PencilRuler,
    title: 'Subject Tutoring',
    description:
      'Personalized academic support across all subjects. Our expert tutors provide one-on-one instruction tailored to each student’s unique learning style and needs.',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
  },
  {
    icon: School,
    title: 'Graduate Admissions Advising',
    description:
      'Specialized guidance for graduate school applications, from test prep to personal statements that help you stand out in competitive programs.',
    gradient: 'bg-gradient-to-br from-indigo-500 to-blue-600',
  },
  {
    icon: CalendarDays,
    title: 'Events',
    description:
      'Join our workshops, seminars, and information sessions. Stay connected with our community through educational events designed to keep you ahead of the academic curve.',
    gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600',
  },
];

const ServicesSection: FC = () => (
  <section id="services" className="pt-6 pb-12">
    <div className="container mx-auto px-6">
      <div className="text-center mb-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Services</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
          Expert guidance tailored to your unique educational needs and goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {services.map((props, idx) => (
          <ServiceCard key={idx} {...props} />
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;