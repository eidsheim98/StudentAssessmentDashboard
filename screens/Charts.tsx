import { useEffect, useState } from "react";
import { Button, Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";


interface BarProps {
    grades: number[]
}

const MyBarChart: React.FC<BarProps> = ({grades}) => {
    const [updatedGrades, setUpdatedGrades] = useState<number[]>([]);

    useEffect(()=>{
        setUpdatedGrades(grades)
    }, [grades])


    var data = {
        labels: ["A", "B", "C", "D", "E", "F"],
        datasets: [
          {
            data: updatedGrades,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };

    return(
        <View>
        <Button title='update chart' color='maroon' onPress={()=>setUpdatedGrades([0,2,3,4,5,6])}></Button>
        <BarChart
            data={data}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16
            },
            propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
            }
            }}
        />
        </View>
    )
}

export default MyBarChart;