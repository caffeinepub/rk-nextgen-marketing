import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Array "mo:core/Array";

actor {
  // Types
  type ContactSubmission = {
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Session = {
    token : Text;
    expiresAt : Time.Time;
  };

  type SEOSettings = {
    title : Text;
    metaDescription : Text;
    metaKeywords : Text;
    ogImageUrl : Text;
  };

  type Service = {
    imageUrl : Text;
    name : Text;
    description : Text;
  };

  type WhyUsFeature = {
    iconUrl : Text;
    title : Text;
    description : Text;
  };

  type HeroSection = {
    backgroundImageUrl : Text;
    headline1 : Text;
    headline2 : Text;
    subheadline : Text;
    ctaText : Text;
  };

  type ServicesSection = {
    badgeText : Text;
    heading : Text;
    subheading : Text;
    services : [Service];
  };

  type WhyUsSection = {
    heading : Text;
    subheading : Text;
    features : [WhyUsFeature];
  };

  type AboutSection = {
    heading : Text;
    paragraph1 : Text;
    paragraph2 : Text;
    ctaText : Text;
  };

  type ContactSection = {
    heading : Text;
    subheading : Text;
    phone : Text;
    email : Text;
  };

  type FooterSection = {
    tagline : Text;
    copyright : Text;
  };

  type SiteContent = {
    hero : HeroSection;
    services : ServicesSection;
    whyUs : WhyUsSection;
    about : AboutSection;
    contact : ContactSection;
    footer : FooterSection;
  };

  // State
  let submissions = List.empty<ContactSubmission>();

  let adminUsername = "admin";
  let adminPassword = "Mission@2026";

  let sessions = Map.empty<Text, Session>();

  var seoSettings : ?SEOSettings = null;
  var siteContent : ?SiteContent = null;

  // Admin Auth
  func isValidToken(token : Text) : Bool {
    switch (sessions.get(token)) {
      case (null) { false };
      case (?session) {
        if (Time.now() > session.expiresAt) {
          sessions.remove(token);
          false;
        } else {
          true;
        };
      };
    };
  };

  public shared ({ caller }) func adminLogin(username : Text, password : Text) : async Text {
    if (username != adminUsername or password != adminPassword) {
      Runtime.trap("Invalid credentials");
    };
    let token = username # Time.now().toText();
    let session : Session = {
      token;
      expiresAt = Time.now() + 24 * 60 * 60 * 1000000000;
    };
    sessions.add(token, session);
    token;
  };

  public shared ({ caller }) func verifyAdminToken(token : Text) : async Bool {
    isValidToken(token);
  };

  public shared ({ caller }) func adminLogout(token : Text) : async Bool {
    if (not isValidToken(token)) {
      Runtime.trap("Invalid or expired token");
    };
    sessions.remove(token);
    true;
  };

  // Contact Submissions
  public shared ({ caller }) func submitContactForm(name : Text, phone : Text, message : Text) : async () {
    if (Text.equal(name, "") or Text.equal(phone, "") or Text.equal(message, "")) {
      Runtime.trap("All fields must be filled");
    };

    let submission : ContactSubmission = {
      name;
      phone;
      message;
      timestamp = Time.now();
    };

    submissions.add(submission);
  };

  public shared ({ caller }) func getAllSubmissions(token : Text) : async [ContactSubmission] {
    if (not isValidToken(token)) {
      Runtime.trap("Invalid or expired token");
    };
    submissions.toArray();
  };

  public shared ({ caller }) func deleteSubmission(token : Text, index : Nat) : async () {
    if (not isValidToken(token)) {
      Runtime.trap("Invalid or expired token");
    };
    if (index >= submissions.size()) {
      Runtime.trap("Index out of range");
    };
    let array = submissions.toArray();
    submissions.clear();
    for (i in Nat.range(0, array.size())) {
      if (i != index) { submissions.add(array[i]) };
    };
  };

  public shared ({ caller }) func deleteAllSubmissions(token : Text) : async () {
    if (not isValidToken(token)) {
      Runtime.trap("Invalid or expired token");
    };
    submissions.clear();
  };

  // SEO
  public shared ({ caller }) func saveSeoSettings(token : Text, seo : SEOSettings) : async () {
    if (not isValidToken(token)) {
      Runtime.trap("Invalid or expired token");
    };
    seoSettings := ?seo;
  };

  public query ({ caller }) func getPublicSeoSettings() : async ?SEOSettings {
    seoSettings;
  };

  // Content
  public shared ({ caller }) func saveSiteContent(token : Text, content : SiteContent) : async () {
    if (not isValidToken(token)) {
      Runtime.trap("Invalid or expired token");
    };
    siteContent := ?content;
  };

  public query ({ caller }) func getPublicSiteContent() : async ?SiteContent {
    siteContent;
  };
};
