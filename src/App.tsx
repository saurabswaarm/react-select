import React from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import {AsyncPaginate } from 'react-select-async-paginate';

interface Passenger {
  _id: string;
  name: string;
}

const MySelect: React.FC = () => {
  const loadOptions = async (
    searchInput: string,
    prevOptions: OptionsOrGroups<Passenger, GroupBase<Passenger>>,
    { page }: { page: number }
  ) => {
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
    );
    const data = await response.json();
    console.log(data);

    return {
      options: data.data.map((passenger: Passenger) => ({
        value: passenger._id,
        label: passenger.name,
      })),
      hasMore: data.totalPages > page,
      additional: {
        page: page + 1,
      },
    };
  };

  // OptionsOrGroups<Passenger, GroupBase<Passenger>>

  return (
    <AsyncPaginate
      loadOptions={loadOptions}
      isClearable
      placeholder="Select a passenger"
    />
  );
};

export default MySelect;
