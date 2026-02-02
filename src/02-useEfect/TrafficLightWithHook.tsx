import { useEffect, useState } from "react"

const colors = {
    red: "bg-red-500 animate-pulse",
    yellow: "bg-yellow-500 animate-pulse",
    green: "bg-green-500 animate-pulse",
}

type TrafficLightColor = keyof typeof colors;

export const TrafficLightWithHook = () => {
    
    const [light, setLight] = useState<TrafficLightColor>("red");
    const [countDown, setCountDown] = useState(5);

    useEffect(() => {
        if (countDown === 0) return

        const intervalId = setInterval(() => {
            console.log('setInterval');
            
            setCountDown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
        
    }, [countDown]);

    useEffect(() => {
        if (countDown > 0) return;

        setCountDown(5);

        if (light === "red") {
            setLight("green");
        } else if (light === "green") {
            setLight("yellow");
        } else if (light === "yellow") {
            setLight("red");
        }

        return;

    }, [countDown, light]);

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
          <div className="flex flex-col items-center space-y-8">

            <h1 className="text-4xl font-bold text-white mb-8">Traffic Light with useEffect</h1>
            <h2 className="text-2xl font-semibold text-white">{countDown}</h2>
            <div className="w-64 h-2 bg-gray-700 rounded-full h2">
                <div 
                    className="h-2 rounded-full bg-white transition-all duration-1000 ease-linear"
                    style={{ width: `${((5 - countDown) / 5) * 100}%` }}
                ></div>

            </div>

            <div 
                className={`w-32 h-32 rounded-full ${
                    light === "red" ? colors[light] : "bg-gray-500"}`
                }>
            </div>

            <div 
                className={`w-32 h-32 rounded-full ${
                    light === "yellow" ? colors[light] : "bg-gray-500"}`
                }
            ></div>
            
            <div 
                className={`w-32 h-32 rounded-full ${
                    light === "green" ? colors[light] : "bg-gray-500"}`}
            ></div>

          </div>
      </div>
  )
}
