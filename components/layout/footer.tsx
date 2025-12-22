import Link from "next/link"
import Image from "next/image"
import { Facebook, Linkedin, Mail, MapPin, Phone, ArrowRight } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-200 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center mb-6">
                            <Image
                                src="/full-logo.jpg"
                                alt="PSV IT & Office Solution"
                                width={200}
                                height={45}
                                className="h-11 w-auto object-contain brightness-110 contrast-125"
                            />
                        </div>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Premium IT equipment rental services for businesses in Chennai and surrounding areas. Empowering growth through flexible technology solutions.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary transition-colors text-white">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="https://linkedin.com" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary transition-colors text-white">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Home", href: "/" },
                                { name: "About Us", href: "/about" },
                                { name: "Shop", href: "/shop" },
                                { name: "Contact", href: "/contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors flex items-center group">
                                        <ArrowRight className="w-4 h-4 mr-2 -ml-6 opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-slate-400">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>No.36/71, 2nd floor, Thambuchetty St, Chennai-01</span>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-400">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href="mailto:info@psvitsolution.in" className="hover:text-primary transition-colors">info@psvitsolution.in</a>
                            </li>
                            <li className="flex items-center space-x-3 text-slate-400">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>+91 9385417594</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div>
                        <h4 className="text-white font-bold mb-6 text-lg">Need Assistance?</h4>
                        <p className="text-slate-400 mb-6 text-sm">
                            Our experts are ready to help you find the perfect IT solutions for your business.
                        </p>
                        <Link href="/contact" className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
                            Contact Support
                        </Link>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} PSV IT & Office Solution. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
