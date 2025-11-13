const ColouredBackground = () => (
  <div className='relative'>
    <div aria-hidden='true' className='absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20'>
      <div className='from-terciary to-terciary h-56 bg-linear-to-br blur-[106px]'></div>
      <div className='h-96 bg-linear-to-r from-green-400 to-green-400 blur-[106px]'></div>
    </div>
  </div>
);

export default ColouredBackground;
