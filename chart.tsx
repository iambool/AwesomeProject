import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Button, useColorScheme} from 'react-native';

// import { SvgChart, SVGRenderer } from '@wuba/react-native-echarts';
import SvgChart, {SVGRenderer} from '@wuba/react-native-echarts/svgChart';
import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  // ...
  BarChart,
]);

const E_HEIGHT = 250;
const E_WIDTH = 300;

export function ChartComponent({option}: {option: any}) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    let chart: any;
    if (chartRef.current) {
      // @ts-ignore
      chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option]);

  // Choose your preferred chart component
  // return <SkiaChart ref={chartRef} />;
  return <SvgChart ref={chartRef} />;
}

const Home = () => {
  // 图表
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  };
  useEffect(() => {
    console.log('挂载之后');
  }, []);

  return (
    <>
      <View>
        <Text>我是首页</Text>
        {/* <ChartComponent option={option} /> */}
        <View style={{width: 100, height: 100}}>
          <ChartComponent option={option} />
        </View>
      </View>
    </>
  );
};

export default Home;
