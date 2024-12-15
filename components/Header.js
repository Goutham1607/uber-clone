import { UserButton } from "@clerk/nextjs";

function Header() {
    const headermenu = [
        {
            id: 1,
            name: 'Ride',
            icon: '/taxi.png'
        },
        {
            id: 2,
            name: 'Package',
            icon: '/box.png'
        }
    ];

    return (
        <div className='p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex items-center justify-between'>
            <div className='flex gap-24 items-center'>
                <img src="/logo.png"
                    width={70} height={70}
                    alt='Logo'
                />
                <div className='flex gap-6 items-center'>
                    {headermenu.map((item) => (
                        <div key={item.id} className='flex gap-2 items-center'>
                            <img src={item.icon}
                                width={17} height={17}
                                alt={item.name}
                            />
                            <h2 className='text-[14px] font-medium' style={{ color: 'black' }}>{item.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <UserButton />
        </div>
    );
}

export default Header;
