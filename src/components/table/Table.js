"use client"

import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User, user } from "@heroui/react"
import { useCallback, useMemo, useState } from "react";

export const PlusIcon = ({size = 24, width, height, ...props}) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <path d="M6 12h12" />
          <path d="M12 18V6" />
        </g>
      </svg>
    );
  };
  
  export const VerticalDotsIcon = ({size = 24, width, height, ...props}) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
      >
        <path
          d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          fill="currentColor"
        />
      </svg>
    );
  };
  
  export const SearchIcon = (props) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  };
  
  export const ChevronDownIcon = ({strokeWidth = 1.5, ...otherProps}) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...otherProps}
      >
        <path
          d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  };

export const EyeIcon = (props) => {
return (
    <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
    >
    <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
    />
    <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
    />
    </svg>
);
};

export const DeleteIcon = (props) => {
return (
    <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
    >
    <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
    />
    <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
    />
    <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
    />
    <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
    />
    <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
    />
    </svg>
);
};

export const EditIcon = (props) => {
return (
    <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
    >
    <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
    />
    <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
    />
    <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
    />
    </svg>
);
};

export const column = [
    {name:"Rapat", uid:"rapat"},
    {name:"Tanggal", uid:"tanggal"},
    {name:"Status", uid:"status"},
    {name:"Aksi",uid:"aksi"}
]

export const statusOptions = [
    {name: "Aktif", uid: "aktif"},
    {name: "Selesai", uid: "selesai"},
    {name: "Arsip", uid: "arsip"},
];

export const users = [
    {
        id :1,
        rapat : "Una Made",
        tanggal : "22 Mei 2025",
        status : "Aktif"
    },
    {
        id :2,
        rapat : "Adit Tolong Dit",
        tanggal : "22 Mei 2025",
        status : "Aktif"
    },
    {
        id :3,
        rapat : "Edam",
        tanggal : "22 Mei 2025",
        status : "Aktif"
    } ,
    {
        id: "4",
        rapat: "William Howard",
        tanggal: "22 Mei 2025",
        status: "Vacation",
      },
      {
        id: "5",
        rapat: "Emily Collins",
        tanggal: "22 Mei 2025",
        status: "Active",
      },
      {
        id: "6",
        rapat: "Brian Kim",
        tanggal: "Product Manager",
        status: "Active",
      },
      {
        id: "7",
        rapat: "Laura Thompson",
        tanggal: "UX Designer",
        status: "Active",
      },
      {
        id: "8",
        rapat: "Michael Stevens",
        tanggal: "Data Analyst",
        status: "Paused",
      },
      {
        id: "9",
        rapat: "Sophia Nguyen",
        tanggal: "Quality Assurance",
        status: "Active",
      },
      {
        id: "10",
        rapat: "James Wilson",
        tanggal: "Front-end Developer",
        status: "Vacation",
      },
]

export function capitalize(s){
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const statusColorMap = {
    aktif: "success",
    selesai: "danger", // Corrected from "dangered"
    arsip: "warning",
    active: "success", // Added for "Active" status
    paused: "default", // Added for "Paused" status (or "warning")
    vacation: "secondary", // Added for "Vacation" status
}



const TableComponent = () =>{
    // const [filterValue, setFilterValue] = useState("");
    // const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    // const [rowsPerPage, setRowsPerPage] = useState(5);
    // const [page, setPage] = useState(1);
    

    // const pages = Math.ceil(users.length / rowsPerPage);

    // const items = useMemo(() => {
    //     const start = (page - 1) * rowsPerPage;
    //     const end = start + rowsPerPage;

    //     return users.slice(start, end);
    // }, [page]);

    // const renderCell = useCallback((user,columnKey)=>{
    //     const cellValue = user[columnKey];

    //     switch(columnKey){
    //         case "rapat":
    //             return (
    //                 <div className="flex flex-col">
    //                     <p className="font-medium text-sm capitalize text-[var(--color-text-primary)]">{user.rapat}</p>
    //                     {/* Example of a secondary text if needed */}
    //                     {/* <p className="text-xs capitalize text-[var(--color-text-tertiary)]">{user.email || 'no-email@example.com'}</p> */}
    //                 </div>
    //             );
    //         case "tanggal":
    //             return (
    //                 <div className="flex flex-col">
    //                     <p className="text-sm capitalize text-[var(--color-text-secondary)]">{user.tanggal}</p>
    //                 </div>
    //             );
    //         case "status":
    //             return (
    //                 <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
    //                     {cellValue}
    //                 </Chip>
    //             );
    //         case "aksi":
    //             return (
    //                 <div className="relative flex justify-end items-center gap-2">
    //                 <Dropdown>
    //                     <DropdownTrigger>
    //                         <Button isIconOnly size="sm" variant="light">
    //                         <VerticalDotsIcon className="text-default-300" />
    //                         </Button>
    //                     </DropdownTrigger>
    //                     <DropdownMenu>
    //                         <DropdownItem key="view">View</DropdownItem>
    //                         <DropdownItem key="edit">Edit</DropdownItem>
    //                         <DropdownItem key="delete">Delete</DropdownItem>
    //                     </DropdownMenu>
    //                 </Dropdown>
    //             </div>
    //             );
    //         default:
    //             return <p className="text-sm text-[var(--color-text-secondary)]">{cellValue}</p>;
    //     }

    // },[])

    // const onNextPage = useCallback(() => {
    //     if (page < pages) {
    //       setPage(page + 1);
    //     }
    // }, [page, pages]);
    
    // const onPreviousPage = useCallback(() => {
    //     if (page > 1) {
    //       setPage(page - 1);
    //     }
    // }, [page]);

    // const bottomContent = useMemo(()=> {
    //     return(
    //         <Pagination 
    //         isCompact
    //         showControls
    //         showShadow
    //         color="primary"
    //         page={page}
    //         total={pages}
    //         onChange={setPage}
    //         >

    //             <div className="hidden sm:flex w-[30%] justify-end gap-2">
    //                 <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
    //                     Previous
    //                 </Button>
    //                 <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
    //                     Next
    //                 </Button>
    //             </div>

    //         </Pagination>
    //     )
    // },[items,page,pages]) 

    // return (
    //     <div> 
    //         <h1 className="text-xl font-semibold mb-4">User Management</h1>
    //         <Table 
    //             isHeaderSticky
    //             aria-label="Example table with custom cells" 
    //             className="bg-green-400 rounded-sm border-2"
    //             bottomContent={bottomContent}
    //             bottomContentPlacement="otuside"
    //             classNames={{
    //                 wrapper: "max-h-[382px]",
    //             }}
    //             selectionMode = "default"
    //         >
    //             <TableHeader columns={column}>
    //                 {(colItem) => (
    //                     <TableColumn key={colItem.uid}>
    //                         {colItem.name}
    //                     </TableColumn>
    //                 )}
    //             </TableHeader>
    //             <TableBody emptyContent={"No users found"} items={items}>
    //                 {(item) => (
    //                     <TableRow key={item.id}>
    //                         {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
    //                     </TableRow>
    //                 )}
    //             </TableBody>
    //         </Table>
    //     </div>
    // )

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    // Filtered and Paginated Items
    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (filterValue) {
            filteredUsers = filteredUsers.filter((user) =>
                Object.values(user).some((value) =>
                    String(value).toLowerCase().includes(filterValue.toLowerCase())
                )
            );
        }
        return filteredUsers;
    }, [users, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, rowsPerPage, filteredItems]);


    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "rapat":
                return (
                    <div className="flex flex-col">
                        {/* Use cellValue or user.rapat */}
                        <p className="font-medium text-sm capitalize text-[var(--color-text-primary)]">{cellValue}</p>
                    </div>
                );
            case "tanggal":
                return (
                    <div className="flex flex-col">
                        <p className="text-sm capitalize text-[var(--color-text-secondary)]">{cellValue}</p>
                    </div>
                );
            case "status":
                const chipColor = statusColorMap[String(cellValue).toLowerCase()] || "default";
                return (
                    <Chip className="capitalize" color={chipColor} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "aksi": // Corrected from "action" to "aksi"
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-[var(--color-text-tertiary)]" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label={`Actions for ${user.rapat}`}>
                                <DropdownItem key="view" onPress={() => console.log("View:", user.id)}>
                                    <EyeIcon className="mr-2" /> View
                                </DropdownItem>
                                <DropdownItem key="edit" onPress={() => console.log("Edit:", user.id)}>
                                    <EditIcon className="mr-2" /> Edit
                                </DropdownItem>
                                <DropdownItem key="delete" className="text-[var(--color-text-error)]" color="danger" onPress={() => console.log("Delete:", user.id)}>
                                    <DeleteIcon className="mr-2" /> Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return <p className="text-sm text-[var(--color-text-secondary)]">{cellValue}</p>;
        }
    }, []); 

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const topContent = useMemo(() => {
        // Example: If you want to add a search input or other top controls
        return (
            <div className="flex flex-col gap-4 mb-4">
            <Pagination
                showControls
                color="default"
                page = {page}
                total={pages}
                onChange={setPage}
                classNames={{
                    item: "min-w-[32px] h-8 text-sm rounded-md", // Example: Make items a bit bigger
                    // cursor: "bg-blue-500 text-white font-bold", // Example: Style the current page item
                    prev : "min-w-[32px] h-8 text-sm rounded-md",
                    next : "min-w-[32px] h-8 text-sm rounded-md"
                    // ... other parts like 'prev', 'next', 'dots'
                }}
            />
                
            </div>
        )
    }, [filterValue, setFilterValue, page,pages /* other dependencies */]);


    const handleRowClick = (clickedUserItem) => {
        console.log("Row clicked:", clickedUserItem.id, clickedUserItem);
        // Now you directly have the clickedUserItem
        // No need to find it again
    };

    const bottomPaginationContent = useMemo(() => {
        if (pages <= 1) return null; // Jangan tampilkan pagination jika hanya 1 halaman
    
        return (
            <div className="py-2 px-2 flex justify-center items-center"> {/* Ubah ke justify-center jika hanya pagination */}
                <Pagination
                    showControls
                    color="default" // Atau "primary" jika Anda ingin warna aktif
                    page={page}
                    total={pages}
                    onChange={setPage}
                    classNames={{
                        
                        
                        
                        item: "min-w-[32px] h-8 text-sm rounded-md"
                    }}
                />
            </div>
        );
    }, [page, pages]);
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-[var(--color-background-body)]">
            <h1 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Jadwal Rapat</h1>
            <Table
                isHeaderSticky
                aria-label="Tabel Jadwal Rapat"
                bottomContent={pages > 1 ? bottomPaginationContent : null} // Hanya tampilkan jika lebih dari 1 halaman
                bottomContentPlacement="outside" // Penting agar tidak masuk ke dalam scroll wrapper tabel
                classNames={{
                    wrapper: "max-h-[calc(100vh-250px)] min-h-[200px] shadow-[var(--shadow-theme-md)] rounded-lg border border-[var(--color-border-default)]",
                    table: "min-w-full",
                    thead: "bg-[var(--color-background-secondary)]",
                    th: "px-6 py-3 text-left text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider sticky top-0 z-10 bg-[var(--color-background-secondary)]",
                    tbody: "bg-[var(--color-background-primary)] divide-y divide-[var(--color-border-default)]",
                    tr: "cursor-pointer hover:bg-[var(--color-background-secondary)] transition-colors", // Untuk onClick row
                    td: "px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-primary)]",
                }}
            >
                <TableHeader columns={column}>
                    {(colItem) => (
                        <TableColumn
                            key={colItem.uid}
                            align={colItem.uid === "aksi" ? "end" : "start"}
                            // width={colItem.uid === "status" ? 120 : undefined} // Example for width
                        >
                            {colItem.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"Tidak ada data rapat ditemukan."} items={items}>
                    {(item) => (
                        <TableRow key={item.id} onClick={()=>handleRowClick(item)}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}


export default TableComponent;