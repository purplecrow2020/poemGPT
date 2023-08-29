import { useEffect, useState } from "react";
import ApexChart from "../components/Chart";
import socket from '../common/socket';
import { socketEvents } from '../common/socket';

export default function PoemResult(props) {
  const { result } = props;
  const [poem, setPoem] = useState("");
  const [isPoemLoading, setIsPoemLoading] = useState(true);
  const [emotionChartsData, setEmotionChartsData] = useState(null);


  const emotionWiseColors = {
    joy: '#FFD700',
    surprise: '#00CED1',
    sadness: '#D3D3D3',
    anger: '#FF4500',
    disgust: '#66BB6A',
    fear: '#000000',
  };

  const emotionWiseEmoji = {
    anger: '😡',
    disgust: '🤢',
    fear: '😱',
    joy: '😄',
    sadness: '😢',
    surprise: '😮',
  };


  // RELOAD EFFECT
  useEffect(() => {
    socket.emit(socketEvents.GENERATE_POEM, { poemThought: result.input });

    socket.on(socketEvents.POEM_GENERATED, (data) => {
        if (data == null) {
          setIsPoemLoading(false);
        } else {
          setPoem((prevPoem) => {
            return prevPoem + data;
          });
        }
    });

    socket.on(socketEvents.POEM_EMOTION_ANALYSIS, (data) => {
      if (data) {
        const emotionsChartRespresentationData = {
          labels: [],
          data: [],
          colors: [],
        };
        for (const key in data) {
          emotionsChartRespresentationData.labels.push(key + ' ' + emotionWiseEmoji[key.toLocaleLowerCase()]);
          emotionsChartRespresentationData.data.push(data[key]);
          emotionsChartRespresentationData.colors.push(emotionWiseColors[key.toLocaleLowerCase()]);
        }
        setEmotionChartsData({...emotionsChartRespresentationData});
      }
    });
  }, []);


  // POEM LOADER  EFFECT
  useEffect(() => {
    if (!isPoemLoading) {
      socket.emit(socketEvents.ANALYSE_POEM_EMOTIONS, { poem,});
    }
  }, [isPoemLoading]);

  return (
    <div className="poem-container">
      <div className="poem-container__result">
        <div className="result">
          <div className="result__input">
            <span style={{display: 'flex', verticalAlign:'center', flat: 'left'}}>
                <img src="https://cdn-icons-png.flaticon.com/512/5955/5955249.png" alt="poem" style={{width: '40px', height: 'auto'}}/>
                <p style={{fontSize: '12px', marginLeft: '10px'}}>POEM GPT</p>
            </span>
          </div>
          {result && (
            <section className="result__output">
              <p className="poem__result" dangerouslySetInnerHTML={{ __html: poem }}></p>
            </section>
          )}
          { emotionChartsData && (
            <div style={{marginTop: '10px', marginBottom: '40px'}}>
              <ApexChart  labels={emotionChartsData.labels} data={emotionChartsData.data} colors={emotionChartsData.colors} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
