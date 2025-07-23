import React from 'react';

const ActionCell = React.memo(({ row, activeActionMenuRowId, openActionMenu, closedActionMenu }) => {
    const isMenuOpen = activeActionMenuRowId === row.id;
    return (
        <div className="relative">
            <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:text-text-primary transition-colors"
                onClick={(e) => {
                    if(isMenuOpen) {
                        closedActionMenu();
                    } else {
                        openActionMenu(row, e.currentTarget);
                    }
                }}
            >
                ...
            </button>
        </div>
    )
})
ActionCell.displayName = 'ActionCell';

export default ActionCell;