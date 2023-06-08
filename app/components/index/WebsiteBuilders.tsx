import CustomDevelopmentImg from '~/components/index/images/services/CustomDevelopment.png';
import { IndexSection } from '~/components/index/IndexSection';

interface MaintenanceProps {}

export const WebsiteBuilders = ({}: MaintenanceProps) => {
  return (
    <IndexSection>
      <div className="grid grid-flow-row auto-rows-auto items-center justify-between gap-40 md:auto-cols-auto md:grid-flow-col">
        <div>
          <h3 className="text-balance font-heading text-3xl text-brand">
            Website builder management
          </h3>
          <div className="text-balance font-body font-light text-brand text-opacity-80">
            <p>Managing</p>
            <p>Paragraph 2</p>
          </div>
        </div>
        <img src={CustomDevelopmentImg} alt="" style={{}} />
      </div>
    </IndexSection>
  );
};
