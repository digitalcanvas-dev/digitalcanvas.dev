import { IndexSection } from '~/components/IndexSection';
import CustomDevelopmentImg from '~/components/index/images/services/CustomDevelopment.png';

interface MaintenanceProps {}

export const WebsiteBuilders = ({}: MaintenanceProps) => {
  return (
    <IndexSection className="grid grid-flow-row auto-rows-auto items-center justify-between px-8 py-12 md:auto-cols-auto md:grid-flow-col md:px-32 md:py-14">
      <div>
        <h3 className="text-balance font-heading text-3xl text-brand">
          Website builder management
        </h3>
        <p className="text-balance font-body text-brand text-opacity-80">
          Managing
        </p>
      </div>
      <img
        src={CustomDevelopmentImg}
        alt=""
        style={{
          height: '356px',
          width: 'auto',
          transform: 'translateX(-20px)',
        }}
      />
    </IndexSection>
  );
};
