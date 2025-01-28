import { useEffect, useState } from "react"

export default function Test() {
    let [cir, setCir] = useState([]);
    let [cnt, setCnt] = useState(0);

    const width = 800;
    const height = 600; 
    const circleSize = 28;
    const Circle = ({ top, left, onClick }) => {
        return (
          <div
            className="w-7 h-7 bg-red-500 rounded-full absolute"
            style={{ top: `${top}px`, left: `${left}px`, 
            width: `${circleSize}px`, height: `${circleSize}px` }}
            onClick={onClick}
          ></div>
        );
      };

    function addCircle() {
        const newCir = {
            id: Date.now(),
            top: Math.random() * (height - circleSize),
            left: Math.random() * (width - circleSize)
          };
          setCir((prevCir) => [...prevCir, newCir]);
          setTimeout(() => {
            setCir((prevCir) => prevCir.filter((circle) => circle.id !== newCir.id));
          }, 5000);
          console.log(cir);
    }

    function handleClick(id) {
        setCnt(cnt + 1);
        setCir(cir.filter((circle) => circle.id !== id)
        );
      };

    useEffect(() => {
        const interval = setInterval(addCircle, 1000);
        return () => clearInterval(interval);
      }, []);

      return (
        <>
          <h1>Circle Click Game</h1>
          <h2>Clicks: {cnt}</h2>
          <div
            className="bg-white relative"
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {cir.map((circle) => (
              <Circle
                key={circle.id}
                top={circle.top}
                left={circle.left}
                onClick={() => handleClick(circle.id)}
              />
            ))}
          </div>
          </>
      );
    };




