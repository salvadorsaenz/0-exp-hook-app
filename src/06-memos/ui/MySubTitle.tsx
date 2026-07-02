import { memo } from "react";

interface MySubTitleProps {
  subTitle: string;

  callMyAPI: () => void;
}

export const MySubTitle = memo(({ subTitle, callMyAPI }: MySubTitleProps) => {

    console.log("MySubTitle re-render");
    
  return (
    <>
        <h6 className="text-2xl font-thin text-white">{subTitle}</h6>

        <button className="bg-indigo-500 text-white py-2 px-4 rounded-md cursor-pointer"
            onClick={callMyAPI}
        >
            Llamar a función
        </button>
    </>
  )
})
