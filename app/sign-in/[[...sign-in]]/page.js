import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return( 
  
    <div>
    <img src='/banner.jpeg' width={900} height={900}
      className="object-contain h-full w-full"/>
      <div className="absolute top-20 right-0">
      <SignIn />
      </div>
    </div>
  
  );
}