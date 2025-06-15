"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  enableSearch?: boolean;
  enableDateFilter?: boolean;
  searchField?: keyof T;
  dateField?: keyof T;
  itemsPerPage?: number;
  tableHead?: string;
}

function DataTable<T>({
  data,
  columns,
  enableSearch = false,
  enableDateFilter = false,
  searchField,
  dateField,
  itemsPerPage = 5,
  tableHead,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        enableSearch && searchField
          ? String(item[searchField])
              .toLowerCase()
              .includes(search.toLowerCase())
          : true;

      const matchesDate =
        enableDateFilter && dateField
          ? String(item[dateField]).startsWith(filterDate)
          : true;

      return matchesSearch && matchesDate;
    });
  }, [data, search, filterDate, enableSearch, enableDateFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-white p-4 rounded-2xl border shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">{tableHead}</h1>

      {(enableSearch || enableDateFilter) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          {enableSearch && searchField && (
            <input
              type="text"
              placeholder={`Search by ${String(searchField)}...`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          {enableDateFilter && dateField && (
            <input
              type="date"
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-[var(--color-gray-900)] text-xs text-[color:var(--color-white)] uppercase">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-t hover:bg-blue-50 transition`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {paginatedData.length} of {filteredData.length}
        </p>
        <div className="space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
