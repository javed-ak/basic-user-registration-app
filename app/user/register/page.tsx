import Register from '@/components/Register'
import Link from 'next/link'

export default function() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Link href={'/'}>
                <div className='absolute top-10 left-20 font-bold text-lg cursor-pointer hover:scale-105 transition-all'>Home</div>
            </Link>
            <Register />
        </div>
    )
}