import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Manager from '@/components/Manager';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Password Manager - The last-minute password manager you will ever need',
    description: 'Organize your passwords securely',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="">
                    <Navbar />
                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
