import Module from './Module';

export default function ModulePanel({
  modules,
}: {
  modules: import('../types').Module[];
}) {
  return (
    <div className="w-md space-y-2">
      {modules.map((module, index) => (
        <Module key={index} module={module} />
      ))}
    </div>
  );
}
