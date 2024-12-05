import React, {useEffect} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {ArrowRight2} from 'iconsax-react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';
import dayjs from 'dayjs';

import tw from '../../../tailwind';
import {Button, PageWrapper} from '../../components/commons';
import {ProgressBar, SectionWrapper} from '../../components/elements';
import {DASHBOARD_CONST} from '../../constants';
import {textUtil} from '../../utils';

const DashboardIntro = () => {
  const isFocused = useIsFocused();
  const {navigate} = useNavigation();
  const {data, isLoading, refetch} = useQuery({
    queryKey: 'dashboard',
    queryFn: () => axios.get('/pro/dashboard'),
  });
  const {overview, avrages, reports} = DASHBOARD_CONST;
  const getDate = date => dayjs(date * 1000).format('MMM DD');

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <PageWrapper contentContainerStyle={tw`flex-grow`}>
      {isLoading ? (
        <View style={tw`flex-grow items-center justify-center`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <View style={tw`flex-row items-center justify-between px-5 pt-4`}>
            <Text style={tw`text-sm text-descGray font-sans`}>
              Insights Overview
            </Text>
            <Button
              title={`${getDate(data.date.start)} - ${getDate(data.date.end)}`}
            />
          </View>
          <SectionWrapper>
            {overview.map(({key, icon, title}, index) => {
              const {percent, ...values} = data[key];
              const positive = percent > 0 && '+';
              const negative = percent < 0 && '-';

              return (
                <View
                  key={key}
                  style={tw.style('flex-row items-center', {
                    'mt-4': index >= 1,
                  })}>
                  {icon}
                  <Text
                    style={tw`text-xs text-descGray font-sans ml-[10px] mr-auto`}>
                    {title}
                  </Text>
                  {Boolean(percent) && (
                    <Text
                      style={tw.style('text-xs font-sans mr-2', {
                        'text-basicGreen': Boolean(positive),
                        'text-[#FF4444]': Boolean(negative),
                      })}>
                      {(positive || negative) +
                        percent +
                        (key === 'revenue' ? '%' : '')}
                    </Text>
                  )}
                  <Text style={tw`bv-sans-sm`}>
                    {Object.values(values).join(' - ')}
                  </Text>
                </View>
              );
            })}
            {Object.values(data?.book_chart || []).some(value => value > 0) && (
              <ProgressBar.Multiple style={tw`mt-4`} data={data.book_chart} />
            )}
            {Boolean(Number(data.revenue?.percent)) && (
              <Text style={tw`mt-4 text-descGray text-xs font-med text-center`}>
                Our Revenue is{' '}
                <Text style={tw`font-sans`}>{data.revenue?.percent}%</Text>{' '}
                higher compared to last month
              </Text>
            )}
          </SectionWrapper>
          <SectionWrapper>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-descGray text-xs font-sans`}>Goal:</Text>
              <Button
                title={`$${textUtil.putCommas(String(data.goal.value))} ${
                  data.goal.period
                }`}
                style={tw`flex-row-reverse`}
                onPress={() => navigate('GoalModal')}
                icon={<ArrowRight2 color="#7A7A8A" size={16} />}
              />
            </View>
            {Boolean(data?.earned_in_period.value) && (
              <View
                style={tw`mb-5 pb-5 border-b border-[#E4E7EC] border-opacity-75`}>
                <Text style={tw`bv-sans-sm ml-auto`}>
                  ${data.earned_in_period.value}
                </Text>
                <ProgressBar.Regular
                  total={data.earned_in_period.value}
                  percent={data.earned_in_period.percent}
                />
                <Text style={tw`text-sm text-descGray font-sans ml-auto`}>
                  {data.earned_in_period.percent}%
                </Text>
              </View>
            )}
            <View
              style={tw`mb-5 pb-5 border-b border-[#E4E7EC] border-opacity-75`}>
              {avrages.map(({key, title}, index) => (
                <View
                  key={key}
                  style={tw.style(`flex-row items-center justify-between`, {
                    'mt-5': index >= 1,
                  })}>
                  <Text style={tw`text-descGray text-xs font-sans`}>
                    {title}:
                  </Text>
                  <Text style={tw`text-descGray text-sm font-sans`}>
                    {String(data[key]) || '-'}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={tw`mb-5 pb-5 border-b border-[#E4E7EC] border-opacity-75`}>
              {reports.map(({key, title}, index) => {
                const {change, current, predicted} = data[key];
                const positive = change > 0 && '+';
                const negative = change < 0 && '-';

                return (
                  <View
                    key={key}
                    style={tw.style(`flex-row items-center justify-between`, {
                      'mt-5': index >= 1,
                    })}>
                    <Text style={tw`text-descGray text-xs font-sans`}>
                      {title}:
                    </Text>
                    <View style={tw`flex-row`}>
                      {Boolean(change) && (
                        <Text
                          style={tw.style('mr-2', {
                            'text-basicGreen': Boolean(positive),
                            'text-[#FF4444]': Boolean(negative),
                          })}>
                          {change}
                        </Text>
                      )}
                      <Text style={tw`bv-sans-sm mr-2`}>{current}</Text>
                      <Text style={tw`text-descGray text-sm font-sans`}>
                        / {predicted}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-descGray text-xs font-sans`}>
                Projected Achivement date:
              </Text>
              <Text style={tw`text-descGray text-sm font-sans`}>
                {data.proj_ach_date}
              </Text>
            </View>
          </SectionWrapper>
          <SectionWrapper>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-descGray text-xs font-sans`}>
                Number of appointments:
              </Text>
              <Text style={tw`bv-sans-sm`}>{data.apps_count}</Text>
            </View>
          </SectionWrapper>
        </>
      )}
    </PageWrapper>
  );
};

export default DashboardIntro;
