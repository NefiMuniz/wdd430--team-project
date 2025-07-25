import { Poppins } from 'next/font/google';
import { Merriweather } from 'next/font/google';

export const merriweather = Merriweather({
    weight: ['400', '700'],
    subsets: ['latin'],
    style: ['normal', 'italic'],
});

export const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: [ 'latin' ],
});