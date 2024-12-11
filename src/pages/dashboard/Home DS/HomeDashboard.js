import React from 'react'
import mobile from '../../../assests/menu1.png'
import anim from '../../../assests/anim.png'
import { useNavigate } from 'react-router-dom'

const HomeDashboard = () => {
  const navigate = useNavigate()

    return (
        <>
            <div className='px-4'>
                <div className='py-3'>
                    <div className='bg-black shadow-2xl flex justify-around items-center rounded-2xl hover:cursor-pointer' onClick={() => navigate('/dashboard/edit')}>
                        <div className='self-end pl-3'>
                            <img src={anim} alt='' width={200} />
                        </div>
                        <div>
                            <h1 className='text-white text-5xl font-extrabold'>
                                Create Your Digital Menu
                            </h1>
                        </div>
                        <div>
                            <img src={mobile} className='object-contain h-[250px] w-[250px]' alt='' />
                        </div>
                    </div>
                </div>

                {/* <div>
                    <div className='flex gap-4 py-3'>
                        <div className='bg-slate-500 rounded-xl flex-1 h-40'>
                            <h1>Hello helllo</h1>
                        </div>
                        <div className='bg-slate-500 rounded-xl flex-1 h-40'>
                            <h1>Hello helllo</h1>
                        </div>
                        <div className='bg-slate-500 rounded-xl flex-1 h-40'>
                            <h1>Hello helllo</h1>
                        </div>
                    </div>
                </div> */}
            </div>

        </>
    )
}

export default HomeDashboard