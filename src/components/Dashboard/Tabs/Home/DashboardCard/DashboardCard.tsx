import { TPost } from '@/types/types';

export default function DashboardCard({
  postData,
  id,
}: {
  postData: TPost['attributes'];
  id: number;
}) {
  // Retrieve or generate color scheme
  const colorScheme = localStorage.getItem('dashboardCardColors');

  if (!colorScheme) {
    const colorSchemeObj = {
      0: {
        primaryColor: 'rgb(151, 222, 159)',
        secondaryColor: 'rgb(85, 138, 91)',
        borderColor: 'rgb(146, 209, 153)',
      },
      1: {
        primaryColor: 'rgb(222, 198, 151)',
        secondaryColor: 'rgb(172, 145, 95)',
        borderColor: 'rgb(216, 188, 136)',
      },
      2: {
        primaryColor: 'rgb(235, 216, 193)',
        secondaryColor: 'rgb(184, 165, 142)',
        borderColor: 'rgb(229, 207, 179)',
      },
      3: {
        primaryColor: 'rgb(217, 213, 209)',
        secondaryColor: 'rgb(166, 162, 158)',
        borderColor: 'rgb(204, 199, 195)',
      },
      4: {
        primaryColor: 'rgb(175, 172, 228)',
        secondaryColor: 'rgb(106, 103, 177)',
        borderColor: 'rgb(164, 161, 215)',
      },
    };
    localStorage.setItem('dashboardCardColors', JSON.stringify(colorSchemeObj));
  }

  const storedColors = JSON.parse(localStorage.getItem('dashboardCardColors')!);
  const { primaryColor, secondaryColor, borderColor } = storedColors[id];
  const calculatedDate =
    Math.floor(Date.now() - Date.parse(postData.createdAt)) /
    1000 /
    60 /
    60 /
    24;

  return (
    <div
      className="flex-1 flex flex-col gap-1 mx-auto max-w-md rounded-3xl p-4"
      style={{
        backgroundColor: primaryColor,
        border: `2px solid ${borderColor}`,
      }}
    >
      <h3 className="text-black font-bold">
        {postData.title.charAt(0).toUpperCase() + postData.title.slice(1)}
      </h3>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-sm">
          <p style={{ color: secondaryColor }}>by {postData.author}</p>
          <p style={{ color: secondaryColor }}>•</p>
          <p
            className="px-3 rounded-full"
            style={{ backgroundColor: secondaryColor, color: primaryColor }}
          >
            {postData.tag}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p
            className="px-6 py-1 text-white font-bold text-lg rounded-xl w-fit h-fit"
            style={{ backgroundColor: secondaryColor }}
          >
            {postData.views || 0}
          </p>
          <div className="flex flex-col">
            <p className="text-black font-bold">Views</p>
            <p className="text-sm" style={{ color: secondaryColor }}>
              in {Math.floor(calculatedDate)} days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
