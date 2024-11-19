type BulletProps = {
  currentStep: number;
  amount: number;
};

const Bullets = ({ currentStep, amount }: BulletProps) => {
  // Creates an array of numbers from 1 to amount
  const bullets = Array.from({ length: amount }, (_, i) => i + 1);

  return (
    <div className="flex gap-3">
      {bullets.map((bullet) => (
        <div
          key={bullet}
          className={`w-3 h-3 rounded-full ${
            bullet === currentStep ? "bg-primary" : "bg-secondary"
          }`}
        />
      ))}
    </div>
  );
};

export default Bullets;
