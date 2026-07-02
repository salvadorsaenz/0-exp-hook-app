import { useCallback, useState } from "react";
import { MyTitle } from "./ui/MyTitle"
import { MySubTitle } from "./ui/MySubTitle";

export const MemoHook = () => {

    const [title, setTitle] = useState<string>("Mi título");
    const [subTitle, setSubTitle] = useState<string>("Mi subtítulo");

    const handleMyAPI = useCallback(() => {
        console.log("Llamando a mi API...", subTitle);
    }, [subTitle]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
        <h1 className="text-2xl font-thin text-white">Memo Hook</h1>

        <MyTitle title={title} />

        <MySubTitle subTitle={subTitle} callMyAPI={handleMyAPI} />

        <button className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
            onClick={() => setTitle("Hola, " + new Date().getTime())}
        >
            Cambiar título
        </button>
    
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
            onClick={() => setSubTitle("Mundo")}
        >
            Cambiar subtítulo
        </button>
    </div>

  )
}
