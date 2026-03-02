import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import Modal from "../components/Modal";
import { userService } from "../api/userService";
import toast from "react-hot-toast";
import { Layout } from "../components/layout/Layout";

const SettingsPage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await userService.updateProfile(profileData);
      updateUser(profileData);
      toast.success("Profile updated successfully");
      setIsEditProfileOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    try {
      await userService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully");
      setIsChangePasswordOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const IconUser = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const IconLock = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const IconLogout = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  return (
    <Layout onNavbarCreate={() => {}}>
      <div className="settings-container">
        <header className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account preferences and security</p>
        </header>

        <div className="settings-grid">
          <section className="settings-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <IconUser />
              </div>
              <h2 className="card-title">Profile Information</h2>
            </div>
            <div className="card-content">
              <div className="info-row">
                <span className="info-label">Username</span>
                <span className="info-value">@{user?.userName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Display Name</span>
                <span className="info-value">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <button
                className="action-button btn-gradient"
                onClick={() => setIsEditProfileOpen(true)}
              >
                Update Profile
              </button>
            </div>
          </section>

          <section className="settings-card">
            <div className="card-header">
              <div className="icon-wrapper">
                <IconLock />
              </div>
              <h2 className="card-title">Security & Privacy</h2>
            </div>
            <div className="card-content">
              <p style={{ color: "var(--color-muted)", marginBottom: "1rem" }}>
                Keep your account secure by updating your password regularly.
              </p>
              <button
                className="action-button btn-gradient"
                onClick={() => setIsChangePasswordOpen(true)}
              >
                Change Password
              </button>
            </div>
          </section>

          <section className="settings-card danger-card">
            <div className="card-header">
              <div className="icon-wrapper danger-icon">
                <IconLogout />
              </div>
              <h2 className="card-title">Session</h2>
            </div>
            <div className="card-content">
              <p style={{ color: "var(--color-muted)", marginBottom: "1rem" }}>
                Ready to leave? Make sure you've saved all your changes.
              </p>
              <button className="action-button btn-danger" onClick={logout}>
                Logout Account
              </button>
            </div>
          </section>
        </div>

        <Modal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          title="Edit Profile"
        >
          <form onSubmit={handleProfileUpdate}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-input"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({ ...profileData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-input"
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({ ...profileData, lastName: e.target.value })
                }
                required
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                onClick={() => setIsEditProfileOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={isChangePasswordOpen}
          onClose={() => setIsChangePasswordOpen(false)}
          title="Change Password"
        >
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                className="form-input"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-input"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-input"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn"
                onClick={() => setIsChangePasswordOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default SettingsPage;
