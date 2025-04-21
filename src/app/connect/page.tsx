import MatchCardFlip from '@/components/MatchCardFlip';

/** The Home page. */
const Home = () => (
  <main>
  <MatchCardFlip />
  {/* 
  const MatchPage = async () => {
  const profiles = await prisma.profile.findMany();
  profiles.sort((a, b) => a.email.localeCompare(b.email));

  const randomProfiles = profiles[Math.floor(Math.random() * profiles.length)];

  return (
    <Container id={PageIDs.profilesPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        <ProfileCardHelper key={randomProfiles.id} profile={randomProfiles} />
      </Row>
    </Container>
  );
};

export default MatchPage;
  */}
  </main>
);

export default Home;