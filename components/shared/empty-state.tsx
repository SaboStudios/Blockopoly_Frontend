import React from 'react';

/**
 * Reusable empty-state card for lobby/list screens.
 *
 * Usage example:
 * ```tsx
 * <EmptyState
 *   title="No games yet"
 *   description="Create a private game or join an existing room to get started."
 *   action={<button className="...">Create Game</button>}
 * />
 * ```
 */
export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon,
  className = '',
}) => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center text-center gap-3 rounded-[12px] border border-[#003B3E] bg-[#0E1415] px-6 py-10 ${className}`}
    >
      {icon ? <div className="text-[#00F0FF]">{icon}</div> : null}
      <h3 className="font-orbitron font-[700] text-[#F0F7F7] text-[18px] md:text-[20px]">
        {title}
      </h3>
      {description ? (
        <p className="font-dmSans font-[400] text-[#F0F7F7]/70 text-[14px] md:text-[16px] max-w-[420px]">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
