import React from 'react'
import mobile from '../../../assests/menu1.png'
import anim from '../../../assests/anim.png'
import { useNavigate } from 'react-router-dom'

const HomeDashboard = () => {
  const navigate = useNavigate()

    return (
        <>
            <div className='p-4'>
            <div className='bg-black shadow-transparent sm:shadow-2xl gap-3 pt-4 md:gap-0 flex flex-col md:flex-row justify-around items-center rounded-2xl hover:cursor-pointer' onClick={() => navigate('/dashboard/edit')}>
                        <div className='md:block hidden self-end pl-3'>
                            <img src={anim} alt='' width={200} />
                        </div>
                        <div>
                            <h1 className='text-white text-center md:text-5xl text-4xl font-extrabold'>
                                Create Your Digital Menu
                            </h1>
                        </div>
                        <div>
                            <img src={mobile} className='object-contain h-[250px] w-[250px]' alt='' />
                        </div>
                    </div>

            
            </div>

        </>
    )
}

export default HomeDashboard