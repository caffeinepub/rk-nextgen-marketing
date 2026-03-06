import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

actor {
  type ContactSubmission = {
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Int;
  };

  let submissions = List.empty<ContactSubmission>();

  public shared ({ caller }) func submitContactForm(name : Text, phone : Text, message : Text) : async () {
    if (name == "" or phone == "" or message == "") {
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

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    submissions.toArray();
  };
};
