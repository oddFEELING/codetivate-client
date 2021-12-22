import { ResponsivePie } from '@nivo/pie';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const PieChart = () => {
  let Data = [];
  const UserInvestments = useSelector((state) => state.user.value.investments);
  for (let i = 0; i < UserInvestments.length; i++) {
    Data.push({
      id: UserInvestments[i].ticker_name,
      Label: `Investment ${i}`,
      value: UserInvestments[i].invested_amount,
      color: 'blue',
    });
  }
  return (
    <ResponsivePie
      data={Data}
      margin={{ top: 20, right: 60, bottom: 40, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor='#333333'
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 16,
          itemsSpacing: 0,
          itemWidth: 50,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
