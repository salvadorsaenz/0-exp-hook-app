import { useTrafficLight } from "../hooks/useTrafficLight";

export const TrafficLightWithEffect = () => {
    
    const { countDown, percentage, greenLight, redLight, yellowLight } = useTrafficLight();
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
          <div className="flex flex-col items-center space-y-8">

            <h1 className="text-4xl font-bold text-white mb-8">Traffic Light with useEffect</h1>
            <h2 className="text-2xl font-semibold text-white">{countDown}</h2>
            <div className="w-64 h-2 bg-gray-700 rounded-full h2">
                <div 
                    className="h-2 rounded-full bg-white transition-all duration-1000 ease-linear"
                    style={{ width: `${percentage}%` }}
                ></div>

            </div>

            <div 
                className={`w-32 h-32 rounded-full ${ redLight }`}
            ></div>

            <div 
                className={`w-32 h-32 rounded-full ${ yellowLight }`}
            ></div>
            
            <div 
                className={`w-32 h-32 rounded-full ${ greenLight }` }
            ></div>

          </div>
      </div>
  )
}
