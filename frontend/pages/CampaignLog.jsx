import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../src/api"; // adjust path as needed
import toast from "react-hot-toast";

const CampaignLog = () => {
  const { logId } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await API.get(`/api/campaign/${logId}`);
        setCampaign(res.data);
      } catch (err) {
        toast.error("Error fetching campaign log");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [logId]);

  if (loading) return <div>Loading log details...</div>;
  if (!campaign) return <div>Campaign not found.</div>;

  return (
    <div className="container mt-4">
      <h2>Campaign: {campaign.name}</h2>
      <p>
        <strong>Audience Size:</strong> {campaign.audienceSize}
      </p>
      <p>
        <strong>Logic:</strong> {JSON.stringify(campaign.audienceSegment)}
      </p>
      <h4>Communication Logs</h4>
      {campaign.communicationLog.length > 0 ? (
        <ul>
          {campaign.communicationLog.map((log, index) => (
            <li key={index}>{JSON.stringify(log)}</li>
          ))}
        </ul>
      ) : (
        <p>No communication logs available.</p>
      )}
    </div>
  );
};

export default CampaignLog;
